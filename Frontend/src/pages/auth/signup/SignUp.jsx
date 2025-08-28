import { Center, useToast, Checkbox, Container, Flex, FormControl, FormLabel, Input, Stack, Text, Button, FormErrorMessage } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Card from '../../../components/Card'
import { useMutation } from "react-query";
import { signupUser } from "../../../api/query/userQuery";
import { useState } from 'react'

const signupValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords must match").required("Repeat Password is required"),
});

const SignUp = () => {

    const [email, setEmail] = useState("")
    const navigate = useNavigate();

    const toast = useToast()
    const { mutate, isLoading, error, isError } = useMutation({
        mutationKey: ['signup'],
        mutationFn: signupUser,
        onSuccess: (data) => {
            if (email !== "") {
                navigate(`/register-email-verify/${email}`, {
                });
            }
        },
        onError: (error) => {
            toast({
                title: "Sign Up Error",
                description: error.message,
                status: "error",
            });
        },
    });

    return (
        <Container >
            <Center minH="100vh">
                <Card p="6" borderRadius="1rem" w="452px">
                    <Text textStyle="h1" fontWeight="medium"> Welcome to Crypto App</Text>
                    <Text textStyle="p2" color="black.60" mt="4">Create a free account ny filing the data below</Text>

                    <Formik
                        initialValues={{
                            name: "",
                            surname: "",
                            email: "",
                            password: "",
                            repeatPassword: "",
                        }}
                        onSubmit={(value) => {
                            setEmail(value.email)
                            mutate({
                                firstName: value.name,
                                lastName: value.surname,
                                email: value.email,
                                password: value.password,
                            })
                        }}
                        validationSchema={signupValidationSchema}
                    >
                        {() =>
                            <Form>
                                <Stack mt="10" spacing={6}>
                                    <Flex gap="4">
                                        <Field name="name">
                                            {({ field, meta }) => (
                                                <FormControl isInvalid={!!(meta.error && meta.touched)}>
                                                    <FormLabel htmlFor="name">Name</FormLabel>
                                                    <Input
                                                        {...field}
                                                        name="name"
                                                        placeholder="Enter your name...."
                                                    />
                                                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="surname">
                                            {({ field, meta }) => (
                                                <FormControl isInvalid={!!(meta.error && meta.touched)}>
                                                    <FormLabel htmlFor="surname">Surname</FormLabel>
                                                    <Input
                                                        {...field}
                                                        name="surname"
                                                        placeholder="Enter your surname...."
                                                    />{" "}
                                                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Flex>
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
                                    <Field name="repeatPassword">
                                        {({ field, meta }) => (
                                            <FormControl isInvalid={!!(meta.error && meta.touched)}>
                                                <FormLabel htmlFor="repeatPassword">
                                                    Repeat Password
                                                </FormLabel>
                                                <Input
                                                    {...field}
                                                    name="repeatPassword"
                                                    type="password"
                                                    placeholder="Enter your repeatPassword...."
                                                />{" "}
                                                <FormErrorMessage>{meta.error}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>

                                    <Checkbox>
                                        <Text textStyle="p3">
                                            I agree With{" "}
                                            <Text as="span" color="p.purple">
                                                Terms and Conditions
                                            </Text>
                                        </Text>
                                    </Checkbox>
                                    <Button type="submit" isLoading={isLoading}>
                                        Create Account
                                    </Button>
                                    <Text textStyle="p3" color="black.60" textAlign="center">
                                        Already have an account?{" "}
                                        <Link to="/signin">
                                            <Text as="span" color="p.purple">
                                                Login
                                            </Text>
                                        </Link>
                                    </Text>
                                </Stack>
                            </Form>
                        }

                    </Formik>
                </Card>
            </Center>
        </Container>
    )
}

export default SignUp
