import {
  Box, Card, Layout, Page, Text,
  BlockStack, InlineGrid, TextField, Button, useBreakpoints
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { data, json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import PrismaConnection from "./../db.server.js";

// GET: Load settings
export async function loader() {
  const settings = await PrismaConnection.Settings.findFirst();


  console.log('settings -------->', settings);

  return json(settings);
}

// POST: Save or update settings
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const savedSettings = await PrismaConnection.settings.upsert({
    where: { id: '1' }, // Assumes there's a unique ID of '1' to target
    update: {
      name: data.name,
      description: data.description,
    },
    create: {
      id: '1', // Ensure to include `id` in create if your model requires it
      name: data.name,
      description: data.description,
    },
  });

  return json(savedSettings);
}
export default function SettingsPage() {
  const settings = useLoaderData();
  const [formState, setFormState] = useState(settings);

  const { smUp } = useBreakpoints();

  return (
    <Page>
      <TitleBar title="Settings" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box paddingInlineStart={{ xs: 400, sm: 0 }} paddingInlineEnd={{ xs: 400, sm: 0 }}>
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">Settings</Text>
              <Text as="p" variant="bodyMd">Update app settings and preferences</Text>
            </BlockStack>
          </Box>

          <Card roundedAbove="sm">
            <Form method="POST">
              <BlockStack gap="400">
                <TextField
                  label="App Name"
                  name="name"
                  value={formState?.name || ""}
                  onChange={(value) => setFormState({ ...formState, name: value })}
                />
                <TextField
                  label="Description"
                  name="description"
                  value={formState?.description || ""}
                  onChange={(value) => setFormState({ ...formState, description: value })}
                />
                <Button submit>Save</Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}
function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}