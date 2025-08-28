import {
    Center, Checkbox, Container, Flex, Toast,
    FormControl, FormLabel, Input, Stack, Text, Button,
    FormErrorMessage, HStack, Box, useToast
} from '@chakra-ui/react'

import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
// import ChakraCard from '../../../components/Card.jsx'
import Card from '../../../components/Card'
import { useMutation } from 'react-query'
import { signinUser } from '../../../api/query/userQuery.js'
import useAuth from '../../../hooks/useAuth.tsx'

const signupValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Signin = () => {
    const toast = useToast()
    const { login } = useAuth()
    const { mutate, isLoading, error, isError } = useMutation({
        mutationKey: ['signin'],
        mutationFn: signinUser,
        onSuccess: (data) => {
            const { token } = data;
            if (token) {
                login(token)
            }
        },
        onError: (error) => {
            toast({
                title: "Sign In Error",
                description: error.message,
                status: "error",
            });
        },
    });



    return (
        <Container>
            <Center minH="100vh">
                <Card >
                    <Text textStyle="h1" fontWeight="medium"> Welcome to Crypto App</Text>
                    <Text textStyle="p2" color="black.60" mt="4">Enter your credentials below</Text>
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        onSubmit={(value) => {
                            console.log(value);
                            mutate(value);
                        }}
                        validationSchema={signupValidationSchema}
                    >
                        {() =>
                            <Form>
                                <Stack mt="10" spacing={6}>
                                    <Field name="email">
                                        {({ field, meta }) => (
                                            <FormControl isInvalid={!!(meta.error && meta.touched)}>
                                                <FormLabel htmlFor="email">Email</FormLabel>
                                                <Input
                                                    {...field}
                                                    name="email"
                                                    type="email"
                                                    placeholder="Enter your email...."
                                                />{" "}
                                                <FormErrorMessage>{meta.error}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="password">
                                        {({ field, meta }) => (
                                            <FormControl isInvalid={!!(meta.error && meta.touched)}>
                                                <FormLabel htmlFor="password">Password</FormLabel>
                                                <Input
                                                    {...field}
                                                    name="password"
                                                    type="password"
                                                    placeholder="Enter your password...."
                                                />{" "}
                                                <FormErrorMessage>{meta.error}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <HStack justify="space-between">
                                        <Checkbox>
                                            <Text textStyle="p3">  Remember me</Text>
                                        </Checkbox>
                                        <Link to="/forgotPassword">
                                            <Text textStyle="p3" color="p.purple"> Forgot Password?</Text>
                                        </Link>
                                    </HStack>

                                    <Box>
                                        <Button isLoading={isLoading} type="submit" w="full"> Log In </Button>

                                        <Link to="/signup">
                                            <Button w="full" mt="3" textStyle="p3" variant="outline"> Create new Account </Button>
                                        </Link>
                                    </Box>


                                </Stack>
                            </Form>
                        }

                    </Formik>
                </Card>
            </Center>
        </Container>
    )
}

export default Signin
