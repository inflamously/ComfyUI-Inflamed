#### Intro

This document should explain some parts of InflameComfyui

#### App Structure

* +state: Redux state and business logic in app
* api: tools and models for communicating with the backed server
* assets: files which are loaded into the application
* error-handling: utils and classes for handling exceptions and errors
* component
  * file: component which allows uploading an image file to the server to be used in prompt nodes
  * navigation: basic component which implements react-router links to be navigated to in app
  * nodes: various ui implementations of specific prompt nodes
* routes: includes page components to be navigated to
* socket: implements basic websocket component and hooks
* theme: various styling hooks and utils
* utils: various generic utils
* validators: input and mapper validators or hooks