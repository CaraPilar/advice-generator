import { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  IconButton,
  Spinner,
  Image
} from "@chakra-ui/react";
import DiceIcon from "../components/DiceIcon";
import SocialShare from "../components/SocialShare";

export default function Home({ data, error= null }) {
  const [adviceData, setAdviceData] = useState(data.slip);
  const [isLoading, setLoading] = useState(false);

  if(!!error) {
    console.log(error)
    return  {error}
  }

  const generateAdvice = async () => {
    // function to generate random advice upon user interaction
    setLoading(true);
    fetch("https://api.adviceslip.com/advice")
      .then(res => res.json())
      .then(data => {
        // AdviceSlip API caches results for 2 seconds, any repeat request within 2 seconds returns same advice
        filterProfanity(data.slip).then(response => { 
          if(!response.has_profanity) {
              setAdviceData(data.slip);
              setLoading(false);
          } else {
            generateAdvice();
          }
        }); 
      });
  };

  const filterProfanity = async (data) => {
    try {
      const res = await fetch(`https://api.api-ninjas.com/v1/profanityfilter?text=${data.advice}`, {
        headers: {
          "Content-Type" : 'application/json',
          "X-Api-Key" : process.env.NEXT_PUBLIC_API_KEY,
        }
      });
      let obj = await res.json();
      return obj;
    } catch(error) {
      console.error('Error:', error);
      return error;
    }
  }


  return (
    <Box as="div" pr={3} pl={3} textAlign="center" height="100%" display="flex">
      <Card
        bg={"#323a49"}
        w={"100%"}
        minH={300}
        maxW={540}
        m={"auto"}
        textAlign="center"
        borderRadius={20}
        justifyContent="center"
      >
        <CardHeader>
          <Text
            fontSize="sm"
            color="#52ffa8"
            casing="uppercase"
            fontWeight={"bold"}
            letterSpacing={3}
          >
            Advice #{adviceData.id}
          </Text>
        </CardHeader>
        <CardBody>
          {isLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="#cee3e9"
              color="#52ffa8"
              size="xl"
            />
          ) : (
            <Box>
            <Text fontSize={28} color="#cee3e9" fontWeight={800} pr={3} pl={3} display="flex" flexDirection="column">
              {adviceData.advice}
              <Image mt={3} mb={3} display="block" src="/pattern-divider-desktop.svg" />
              <SocialShare advice={adviceData.advice}/>
            </Text>
            </Box>
          )}
        </CardBody>
        <CardFooter textAlign="center" position="relative">
          <IconButton
            isRound={true}
            aria-label="Submit"
            variant="solid"
            bg="#52ffa8"
            position="absolute"
            bottom="-20px"
            left={0}
            right={0}
            margin={"auto"}
            width="65px"
            height="65px"
            icon={<DiceIcon width={25} height={25} />}
            _hover={{
              boxShadow: "0px 0px 15px #52ffa8",
              animation: "pulse 2s infinite",
            }}
            onClick={generateAdvice}
          />
        </CardFooter>
      </Card>
    </Box>
  );
}

export async function getServerSideProps(context) {
  // Call an external API endpoint to get advice
  try {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();

    return {
      props: {
        data: data || null,
      },
    };
  } catch (err) {
    console.error(err)
    return {
      props: {
        error: 'ERROR...'
      } 
    }
  }
}
