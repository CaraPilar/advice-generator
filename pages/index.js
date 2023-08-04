import { useState } from 'react'

export default function Home({ data }) {
  const [adviceData, setAdviceData] = useState(data.slip)
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setLoading] = useState(false)

  const generateAdvice = () => {
    setLoading(true);
    setDisabled(true)
    fetch('https://api.adviceslip.com/advice')
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
            setAdviceData(data.slip)
            setDisabled(false)
            setLoading(true)
          }, 2000)
        })  
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <h1>Advice Generator</h1> 
     <div className="advice-container card">
      <div className="advice-heading">
        Advice #{adviceData.id}
      </div>
      <div className="advice-quote">
        {adviceData.advice}
      </div>
      <div className="advice-generator-button">
        <button disabled={disabled} onClick={(generateAdvice)}>Give Me Advice!</button>
      </div>
     </div>

    </main>
  )
}


export async function getStaticProps(context) {
  // Call an external API endpoint to get advice
  const res = await fetch('https://api.adviceslip.com/advice');
  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Failed to fetch data, received status ${res.status}`)
  }
  
  // By returning { props: { data } }, the page
  // will receive `data` as a prop at build time
  return {
    props: {
      data,
    },
  }
}