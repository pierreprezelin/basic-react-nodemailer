import { Html, Button, Hr, Text } from "@react-email/components";

interface EmailProps {
	firstName: string;
	lastName: string;
}

export function Email({ firstName, lastName }: EmailProps) {
	return (
		<Html lang="en">
			<Text>
				Hello, {firstName} {lastName}!
			</Text>
			<Hr />
			<Button href="https://example.com">Click me</Button>
		</Html>
	);
}

export default Email;
