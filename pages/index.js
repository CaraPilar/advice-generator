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

export default function Home({ data }) {
  const [adviceData, setAdviceData] = useState(data.slip);
  const [isLoading, setLoading] = useState(false);

  const generateAdvice = () => {
    // function to generate random advice upon user interaction
    setLoading(true);
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((data) => {
        // AdviceSlip API caches results for 2 seconds, any repeat request within 2 seconds returns same advice
        // To avoid recieving the same advice, we use setTimeout for 2 seconds.
        setTimeout(() => {
          setAdviceData(data.slip);
          setLoading(false);
        }, 2000);
      });
  };

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
            <Text fontSize={28} color="#cee3e9" fontWeight={800} pr={3} pl={3}>
              {adviceData.advice}
              <Image src="/pattern-divider-desktop.svg" />
            </Text>
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
  const res = await fetch("https://api.adviceslip.com/advice");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Failed to fetch data, received status ${res.status}`);
  }

  // By returning { props: { data } }, the page
  // will receive `data` as a prop at build time
  return {
    props: {
      data,
    },
  };
}
