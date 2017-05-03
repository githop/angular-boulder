#!/bin/bash

ng build --prod --aot
firebase deploy
