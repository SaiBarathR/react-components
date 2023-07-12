This component uses next-themes library, So do install those dependencies.

npm i next-themes

Tailwind Config: Add dark : "class" in the config.

Then wrap your root layout or the component for which you want to add drak mode with ThemeProvider component.
Then you can add the ModeSwitcherButton component to switch between light and dark mode.

It will default you system settings unless user explicitly changes mode.