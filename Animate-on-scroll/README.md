This component uses Framer motion library, So do install those dependencies.

npm i framer-motion

npm i @mui/material

Props Available : 
type - ComponentType ex:"h1','h2','h3,'p','div' etc
initial - Before in inViewport
whileInView - Inviewport
className - style the conatiner
style - inline styles

If you want to use any libraries then you simple use the function useElementOnScreen which will give you ref and whether your component with the ref in viewport.
