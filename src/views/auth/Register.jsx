import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spinner,
  Stack,
  Text,
  chakra,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate, Link as ReactRouterLink } from "react-router-dom"
import registerBackgroundImg from "../../assets/images/register-background.jpg"
import knowlinkLogo from "../../assets/svgs/Logo.svg"
import knowlinkIcon from "../../assets/svgs/Icon.svg"
import { createUserProfile, loginUser, registerUser } from "../../utils/auth"

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
}

export default function Register() {
  const [show, setShow] = useState(false)
  const [form, setForm] = useState(initialState)
  const [loading, setLoading] = useState(false)

  const toast = useToast()
  const navigate = useNavigate()

  // const navigate = useNavigate()

  const handleChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }))
  }

  const handleClick = () => setShow(!show)

  const handleRegister = (e) => {
    e.preventDefault()

    if (form.email && form.firstName && form.lastName && form.password) {
      setLoading(true)

      registerUser({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      })
        .then((data) => {
          setLoading(false)

          createUserProfile(data)
            .then(() => {

              loginUser({email: form.email, password: form.password})
                .then((data) => {
                  if (data) navigate("/")
                })
                .catch((error) => {
                  console.log(error)
                  navigate("/login")
                })
            })
            .catch((error) => {
              console.log(error)
              navigate("/login")
            })
        })
        .catch((error) => {
          // Handles error
          setLoading(false)

          if (!error.message) {
            toast({
              title: "Authentication error",
              description: "Something went wrong",
              status: "error",
              duration: 2000,
              isClosable: true,
              position: "bottom-left",
            })
          } else {
            toast({
              title: "Authentication error",
              description: error.message,
              status: "error",
              duration: 2000,
              isClosable: true,
              position: "bottom-left",
            })
          }
        })
    } else {
      toast({
        title: "Authentication error",
        description: "Fill in all fields",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom-left",
      })
    }
  }

  return (
    <Stack minH={"100vh"} direction={{ base: "column", lg: "row" }}>
      <chakra.div
        flex={1}
        display={{ base: "none", lg: "flex" }}
        backgroundImage={registerBackgroundImg}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        p="10"
        pb="24"
        color="white"
      >
        <Image height="2rem" width="auto" src={knowlinkIcon} alt="knowlink icon" />
        <Flex
          bg="blackAlpha.500"
          p="6"
          borderRadius="5"
          flexDirection="column"
          gap="4"
          alignSelf="flex-end"
        >
          <Heading>
            The Link to Smarter Studying
          </Heading>
        </Flex>
      </chakra.div>

      <Flex flex={1} bg={"gray.50"}>
        <Stack spacing={8} mx={"auto"} width="lg" py={12} px={6}>
          <Stack align={"center"}>
            <Image height="2rem" width="auto" src={knowlinkLogo} alt="knowlink" />
            <Heading fontSize={"sm"} color="gray.500">Start smart studying</Heading>
          </Stack>
          <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <Stack direction={["column", "row"]}>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      name="firstName"
                      onChange={handleChange}
                      placeholder="First name"
                      size="lg"
                      type="text"
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      name="lastName"
                      onChange={handleChange}
                      placeholder="Last name"
                      size="lg"
                      type="text"
                    />
                  </FormControl>
                </Box>
              </Stack>

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  name="email"
                  onChange={handleChange}
                  placeholder="Email address"
                  size="lg"
                  type="email"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="lg">
                  <Input
                    pr="4.5rem"
                    name="password"
                    onChange={handleChange}
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      variant="accent"
                      h="1.75rem"
                      size="sm"
                      onClick={handleClick}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Stack spacing={5}>
                <Button size="lg" onClick={handleRegister}>
                  {loading ? <Spinner size="sm" /> : "Register"}
                </Button>
                <Text alignSelf="center" fontSize="md" fontWeight="medium">
                  Already registered?{" "}
                  <Link
                    as={ReactRouterLink}
                    to="/login"
                    alignSelf="flex-end"
                    color={"blue.400"}
                  >
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Stack>
  )
}
