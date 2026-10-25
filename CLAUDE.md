# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A Vigyanshaala fork of `tutor-indigo` (the upstream README.rst still describes upstream Indigo; much of it no longer applies). It is a Tutor plugin (entry point `indigo` → `tutorindigo.plugin`, Tutor/tutor-mfe 21.x, Ulmo) whose real job is **patching the MFE build**: it injects Vigyanshaala React components (header nav, footer, user menus, dark-theme helpers) into the generated `env.config.jsx` and installs the `vs-brand` package as `@edx/brand` in MFE images.

It does **not** ship the LMS/CMS Mako/Sass theme. `tutorindigo/templates/indigo/` contains only `tasks/init.sh`; the deployed `vs-theme` lives on disk under `~/.local/share/tutor/env/build/openedx/themes/vs-theme/` (see the workspace-level `../CLAUDE.md`). The `ENV_TEMPLATE_TARGETS` / `ENV_PATTERNS_INCLUDE` entries for `indigo/...` sass and `indigo/env.config.jsx` in `plugin.py` are upstream leftovers that point at files that no longer exist.

## Environment status

- Installed editable into the shared venv (`source /home/lenovo/tutor-env/bin/activate`): edits to `tutorindigo/` are picked up by Tutor without reinstalling.
- On this machine the `indigo` plugin is **installed but not enabled** (`tutor plugins list`). Until `tutor plugins enable indigo` is run, changes here have no effect on the running `tutor dev` stack.
- To check output: `tutor config save`, then inspect `$(tutor config printroot)/env/plugins/mfe/build/mfe/env.config.jsx`. MFE images must be rebuilt (`tutor images build mfe`) for the prebuilt `mfe` container to pick up changes.
- Branches: `uat` (working branch), `release` (upstream-style default). There is no local `main`.

## Commands

```bash
make test-lint     # ruff check ./tutorindigo
make test-format   # ruff format --check --diff
make format        # ruff format
make fix-lint      # ruff check --fix
make test-types    # mypy --strict (excludes templates)
make test          # lint + types + format + package build/twine check (what CI runs)
make changelog-entry   # scriv create → changelog.d/
```

There are no unit tests; ruff only checks Python (`plugin.py`, `__about__.py`). JSX is not linted or built here — the only real check is building/running an MFE.

## How plugin.py wires components (read before adding one)

1. **Every file** in `tutorindigo/components/` and `tutorindigo/patches/` is registered as an `ENV_PATCHES` entry whose name is the filename (e.g. `"IndigoFooter.jsx"`). Registration alone does nothing visible.
2. The three files in `patches/` are named after tutor-mfe's `env.config.jsx` patch points and use `{{- patch("X.jsx") }}` to pull components in:
   - `mfe-env-config-buildtime-imports` → `Imports.jsx` (static `import` lines shared by all components)
   - `mfe-env-config-buildtime-definitions` → `AddDarkTheme.jsx`
   - `mfe-env-config-runtime-definitions` → footer, header nav, user menu, logo, toggle components
   These generic patch points apply to **every** MFE, including `authn` and `authoring`.
3. MFE-specific code goes through `mfe-env-config-runtime-definitions-{mfe}` patches added in `plugin.py`, using `await import(...)` for packages that only some MFEs ship:
   - `ResponsiveHeaderBreakpoint.jsx` + `react-responsive` / `MobileHeader` → only `indigo_styled_mfes` (authn has no `@edx/frontend-component-header`; authoring uses `StudioHeader`).
   - `CustomStudioHeaderUserMenuItem.jsx` + Paragon `Dropdown` / react-router `Link` → only `authoring`.
4. `PLUGIN_SLOTS.add_item((mfe, slot_id, ops))` connects components to slots, referring to them by the global names defined in the components.
   - For each MFE in `indigo_styled_mfes` (learning, learner-dashboard, profile, account, discussions, communications, gradebook, ora-grading, public): footer, desktop/mobile main menu (`modifyMainMenu`), the desktop header wrapper (`wrapDesktopHeaderForBreakpoint`, switching to the mobile header below 1110px), the user-menu toggle (`DesktopUserMenuToggleAvatar`), and the desktop/mobile user menu (`CustomHeaderUserMenuItem`).
   - `authoring`: `org.openedx.frontend.authoring.studio_header_user_menu.v1`, a slot that exists only in the Vigyanshaala authoring fork.
   - `profile`: `header_desktop.v1`/`header_mobile.v1` Modify with `modifyHeaderUsername`, because its header v6 has no user-menu toggle slot.
   - `authn` and `authoring` get the `vs-brand` install but no learner header/footer slots.

**Constraints on component files:**
- They are not ES modules. They are pasted together into one `env.config.jsx`, so they share a global scope: no `export`, no per-file `import`s (add static imports to `Imports.jsx`, or use `await import` in the per-MFE patch), and top-level names must be unique across all files.
- Patch contents are rendered by Jinja, so a literal `{{` / `{%` in JSX (for example `style={{...}}`) will break rendering. The existing components avoid this by injecting CSS through `ensure*Style()` helpers that append `<style>` tags. Use the same approach, or wrap the code in `{% raw %}…{% endraw %}`.
- A new component only takes effect once it is both included from a `patches/` file (or a per-MFE patch in `plugin.py`) and referenced in a `PLUGIN_SLOTS` entry.
- Components read URLs from `getConfig()`/`AppContext` config (`LMS_BASE_URL`, `CATALOG_MICROFRONTEND_URL`, `STUDIO_BASE_URL`, `TAS_ADMIN_MICROFRONTEND_URL`, `ANALYTICS_URL`, `LOGO_WHITE_URL`, …). Do not hardcode hosts.
- Admin-only menu items check `authenticatedUser.administrator === true`.

## frontend-base MFEs (progress)

MFEs built on `@openedx/frontend-base` (listed in `indigo_frontend_base_mfes`; today only `progress`) do not load `env.config.jsx` or frontend-plugin-framework slots, so the `PLUGIN_SLOTS` above never reach them. Do **not** add them to `indigo_styled_mfes`. Instead:

- `templates/vs-frontend-base/site-chrome/` (`index.jsx`, `site-chrome.css`) is rendered into the MFE build context. `index.jsx` pulls in `IndigoFooter.jsx`, `CustomHeaderNav.jsx`, `CustomHeaderUserMenuItem.jsx` and `CustomHeaderUserMenuDropdown.jsx` with `{{ patch(...) }}`, defines the frontend-platform API they use (`getConfig()` from `/api/mfe_config/v1?mfe=<app>`, `AppContext`), and plugs them into the frontend-base shell's header/footer slots. So header/footer changes are still made only in `components/`. Any new global a shared component starts using must also be provided in `index.jsx`.
- Patches per MFE: `mfe-dockerfile-post-npm-install-<mfe>` installs vs-brand as `@edx/brand` (only its `dist/light.min.css` is imported); `mfe-dockerfile-pre-npm-build-<mfe>` copies `site-chrome/` over the MFE's `src/site-chrome/`, whose default in the MFE repo is a no-op (so local `npm run dev` shows the stock chrome).
- The template directory must not start with `indigo`: Tutor matches `ENV_TEMPLATE_TARGETS` by prefix, and `("indigo", "build/openedx/themes")` would copy it into the LMS theme.
- The MFE needs an `MFE_CONFIG_OVERRIDES["<mfe>"]` entry (`CATALOG_MICROFRONTEND_URL`, `LOGO_WHITE_URL`) like the other MFEs; without it the module falls back to `<origin>/public/` and the normal logo.
- Where a `tutor-mfe-bookworm` plugin replaces tutor-mfe's `mfe/build/mfe/Dockerfile` with a static file (UAT does), **no** `mfe-dockerfile-*` patch from this plugin is applied; the same lines must be added to that static Dockerfile by hand.

## Other plugin.py behavior

- Config keys are `INDIGO_*` (`PRIMARY_COLOR` `#69AB4A`, `ENABLE_DARK_TOGGLE` default `False`, `FOOTER_NAV_LINKS`, `WELCOME_MESSAGE`). `ENABLE_DARK_TOGGLE` and `FOOTER_NAV_LINKS` are exposed to MFEs through `MFE_CONFIG` in the LMS dev/prod settings patches.
- Appends `-indigo` to `DOCKER_IMAGE_OPENEDX` and `MFE_DOCKER_IMAGE`.
- Adds `indigo/js/dark-theme.js` to the LMS pipeline JS bundles.
- Sets `MFE_CONFIG["PARAGON_THEME_URLS"]` to edly-io `brand-openedx` `ulmo/indigo` CSS URLs. Recent commits on `uat` have removed and then restored these CDN URLs, so confirm what is wanted before changing them.
- `init.sh` (run via `tutor ... do init`) assigns the `indigo` theme to LMS/CMS sites that have no theme yet.

Live Vigyanshaala Tutor plugins that are not part of this package (per-MFE fork wiring, authn custom pages, etc.) live in `/home/lenovo/.local/share/tutor-plugins/`. They can patch the same slots, so check there when a slot behaves unexpectedly.
