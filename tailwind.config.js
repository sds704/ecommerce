import withMT from "@material-tailwind/react/utils/withMT";
 
export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height:{
        header:'560px',
        rate:'400px'
      },
      fontFamily:{
        h1:'2.6rem',
      },
      screens:{
        xs:'475px'
      },
      colors:{
        main:'#080A1A',
        subMain:'#F20000',
        dry:'#0B0F29',
        star:'#FFB000',
        text:'#C0C0C0',
        border:'#4b5563',
        dryGray:'#E0D5D5',
      }
    },
  },
  plugins: [],
});