
import { FaTwitter } from "react-icons/fa";
import { Box, Text, Icon } from "@chakra-ui/react";

const SocialShare = (props) => {
  const shareAdvice = () => {
    let shareURL = '';
    const pageURL = window.location.href;
    shareURL = `https://twitter.com/share?url=${encodeURIComponent(pageURL)}&text=${encodeURIComponent(props.advice)}`;
    window.open(shareURL, '_blank');
  }

  return (
    <>
      <Box as="span" display="inline-block" className="social-share" width="100%" pr={5} pl={5} color="#52ffa8" >
        <Text as="span" display="flex" justifyContent="flex-end" fontSize="sm" color="#52ffa8" casing="uppercase" fontWeight={"bold"} letterSpacing={3}  cursor="pointer" alignItems="center"  onClick={shareAdvice}> 
          Share Advice &nbsp; <Icon as={FaTwitter} w="20px" h="20px" alignItems="center" /> 
        </Text>
      </Box>
    </>
  )
  }

export default SocialShare;
