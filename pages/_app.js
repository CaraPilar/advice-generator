import Layout from '../components/layout'
import {useEffect} from 'react'

export default function App({ Component, pageProps}) {

  return (
    <Layout>
    <Component {...pageProps} />
  

    </Layout>
  )

}

// export async function getServerSideProps(context) {
//     console.log(context)
//     // Call an external API endpoint to get posts
//     const res = await fetch('https://api.adviceslip.com/advice');
//     const advice = await res.json();
   
//     // By returning { props: { posts } }, the Blog component
//     // will receive `posts` as a prop at build time
//     return {
//       props: {
//         advice,
//       },
//     }
//   }