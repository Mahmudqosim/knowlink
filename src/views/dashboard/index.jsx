import { Flex, Heading } from "@chakra-ui/react"
// import { useRecoilValue } from "recoil"
// import { userState } from "../../atoms/user"

const Dashboard = () => {
  // const user = useRecoilValue(userState)
  
  return (
    <Flex flexDirection="column" gap={4}>
      <Flex>
        <Heading fontSize="2xl">Home</Heading>
      </Flex>
    </Flex>
  )
}

export default Dashboard
