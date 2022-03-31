# Flex Plugin Setup

The following instructions illustrate a quick way to get this Flex plugin code up and running locally, so you can customize and test this code before deploying it to Twilio. These instructions also show how to do a simple deploy to Twilio using the Twilio CLI. More in-depth instructions for building, running, and deploying Flex Plugins can be found in the [Flex Plugins documentation](https://www.twilio.com/docs/flex/developer/plugins). An example of the topics covered are:

- [Running multiple Flex Plugins locally](https://www.twilio.com/docs/flex/developer/plugins/cli/run-multiple-plugins)
- [Using the CLI to programmatically deploy Flex Plugins to Twilio](https://www.twilio.com/docs/flex/developer/plugins/cli/deploy-and-release)
- [Use the Flex Plugins Dashboard](https://www.twilio.com/docs/flex/developer/plugins/dashboard)

## Requirements

- An active Twilio Flex account
- A command line tool like Terminal or iTerm
- [Node.js and npm](https://nodejs.org/en/) (npm is installed with Node)

  - A slightly more elegant solution to installing Node.js is by using [Node Version Manager or nvm](https://github.com/nvm-sh/nvm). This is optional, but many developers prefer the ability to control versions of Node.js from project to project.

- [The Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart)

- The [Flex Plugin extension](https://www.twilio.com/docs/twilio-cli/plugins#available-plugins) to the Twilio CLI

> **Important Note:** If this Flex Plugin requires the use of [Twilio Serverless Functions](https://www.twilio.com/docs/runtime/functions), then be sure to have your [Node.js version set to 14](https://www.twilio.com/docs/runtime/runtime-node-upgrade) within the Serverless Functions directy in your code. This is where using nvm would come in handy as you can set the Node.js version to 14 in an [.nvmrc file](https://github.com/nvm-sh/nvm#nvmrc) in the Serverless Functions directory and set the Node.js version running React/Twilio Flex to a different version.

### A Note About Twilio CLI for Flex

The Twilio CLI is required in the following steps to run and install this plugin. Be sure you are working within the correct profile in your CLI before you deploy code. Each CLI profile is associated with a specific Twilio accounts, so you don't want to mistakenly push code to the wrong Twilio account. Review the [CLI General Usage](https://www.twilio.com/docs/twilio-cli/general-usage) documentation for further details about CLI profiles.

#### CLI General Use

**Create a CLI Profile**
From command line run: `twilio login`
Follow the prompts to finish creating a profile.

**List CLI Profiles**
From command line run: `twilio profiles:list`

**Usa a CLI Profile**
From commandline run: `twilio profiles:use PROFILE_NAME`

## Twilio Flex Plugin - Outbound call from Brand

This plugin will allow you to make outbound calls through your brands. The brand and it's asscociated numbers will be populated as an asset in Twilio console.

## Step 1: Add an Asset file containing the brand and it's numbers

1. Create an Asset file and name it `BrandNumbers.json`
2. Within this file add the brand and their corresponding number as shown below: 
    ```bash
    {
    "Brand 1": "Add a valid registered number for Brand 1",
    "Brand 2": "Add a valid registered number for Brand 2",
    "Brand 3": "Add a valid registered number for Brand 3"
    }
    ```
    Here is an example of what this file would look with actual data : 

    ```bash
    {
    "Brand 1": "+19382010447",
    "Brand 2": "+17622635405",
    "Brand 3": "+16789045659"
    }
    ```

3. Go to your flex console >> Search for `Assets`.
4. Add this file that you created above as an Assets.
5. Once the Asset is deployed, copy the URL of the Assets. Please refer the screenshot below : 
![Assets screenshot](https://github.com/cherylmj01/plugin-outbound-dialer-brand/blob/main/resources/Assets.png) 
6. Paste this URL in the `.env` file within this repository.

## Step 2: Download Plugin Code

> :information_source: If you've used the Twilio CLI to create a Flex Plugin from scratch, you can skip Step 1.

Download or clone this code repository to your local development environment.

GitHub provides several options for downloading this source code:

- Use the [GitHub desktop](https://desktop.github.com/) application
- Clone the code via [HTTPS, SSH, or GitHub CLI](https://github.com/cherylmj01/plugin-outbound-dialer-brand.git)
- Download a zip file of this code.

## Step 3: Install Dependencies

1. Once the plugin code has been downloaded to your development environment, open a Command Line interface and `cd` into the root code directory.
2. Copy the `.env.example` to `.env` and populate the environment variable with your asset file link:

  ```bash
    cp .env.example .env
  ```
3. Copy the `public/appConfig.example.js` to `public/appConfig.js` :

  ```bash
    cp public/appConfig.example.js public/appConfig.js
  ```
4. Once in the root plugin code directory run the following in Command Line: `npm install` or `npm i`
5. All of the code dependencies are installed and you may now start building and running your code locally.

## Step 4: Run Plugin Locally

1. This plugin can be run locally in your default browser by running the following in Command Line: `twilio flex:plugins:start`
2. You will be prompted to login. At this point you can select to use your Twilio login to log into Flex.
3. Once logged into Flex you will see that Flex will be running on `localhost:3000` in your browser.

## Step 5: Deploy and Release Plugin to Twilio

The `twilio flex:plugins:deploy` command automates the process of uploading your plugin to Flex. This allows you to deploy your plugins via the command line, without needing to manually upload them using a GUI. After a deploy, your plugin is not yet enabled for all your users on your Flex application. You need to run the `release` command after the deploy to enable any changes.

The `twilio flex:plugins:release` command is used to change which plugins are live for your users. You can group multiple plugins into a release, and you can re-activate any prior release to rollback changes.

See the [Deploy and Release documentation](https://www.twilio.com/docs/flex/developer/plugins/cli/deploy-and-release) for full detailed instructions.

The `twilio flex:plugins:release` command is used to change which plugins are live for your users. You can group multiple plugins into a release, and you can re-activate any prior release to rollback changes.

See the [Deploy and Release documentation](https://www.twilio.com/docs/flex/developer/plugins/cli/deploy-and-release) for full detailed instructions.

## How does this plugin work ?

This plugin will retrieve information from the provided asset link and it will display the brands in a component within the dialpad as shown below: 

![Outbound Dialer screenshot](https://github.com/cherylmj01/plugin-outbound-dialer-brand/blob/main/resources/Outbound_Dialer.png)

When an agent selects the brand to make a call, a call will be made from the number that is mapped to that brand within the Twilio asset. 

If the brand list is not able to load for some reason, then the agent will be notified as shown below, however the agent will still be able to make a call using the default caller ID.

![Brand List did not load screenshot](https://github.com/cherylmj01/plugin-outbound-dialer-brand/blob/main/resources/BrandListError.png)



