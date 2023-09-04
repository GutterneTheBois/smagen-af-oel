# Barrels

This directory is used to create small functional components (such as buttons or container wrappers) which can be used in the "Components" directory.

## How to use

-   Create subdirectory with a .tsx (e.g. Button.tsx) file and a "index.ts" file.

-   The index file is used only for exporting the default component.

-   The .tsx file should contain a small component and a default export.

-   --_optional_-- create a declaration file (i.e. \<filename>.d.ts) exporting types, functions or interfaces.
-   --_optional_-- create a .css or .scss module to style components _OR_ use "Emotion" styled components.
