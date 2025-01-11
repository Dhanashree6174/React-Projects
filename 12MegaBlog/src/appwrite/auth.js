// go to docs -> authentication -> follow the steps there -> https://appwrite.io/docs/products/auth/quick-start
// encryption and all is done by appwrite itself, we don't have to take care of it
// to get all account methods --> go to account API (https://appwrite.io/docs/references/cloud/client-web/account)
// we will create service here

import conf from '../conf/conf.js';
import {Client, Account, ID} from "appwrite";

export class AuthService
{
    client = new Client();
    account;  // we are not creating the complete client, account var here since we want them to get created using the object so we will create them in constructor

    constructor() {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.account = new Account(client);
    }

    //async to wait till the account is created 
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(),email, password, name) // ID.unique() method generates unique ids

            if(userAccount){
                // return userAccount;
                // call another method --> once acc is created we want to directly log in the user w/o asking for logging in explicitly 
                return this.login({email,password});
            } else
            {
                return userAccount; 
            }

        } catch (error) {
            throw error;
        } // try catch in case account creation fails
    } // the method will take an objevct as parameter and here we are destructuring that object

    async login({email, password}) {
        try{
            return await this.account.createEmailPasswordSession(email, password);
        } catch(error)
        {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error); // could not reach out to the service
        }
        return null; // return null in order to prevent some other value being sent in case of an error
    }

    //Account API --> delete session = logout
    async logout() {
        try {
            // await this.account.deleteSession('current') --> deleted only one session
            //or
            await this.account.deleteSessions() // deletes all sessions of that user
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService(); // creating and exporting the object directly so we don't need to create an object elsewhere when we want to use methods of this class

export default authService;

// we could have directly copied code from docs but the code written here is a better way of writing that code

// if we want to change the auth service/backend service later, we just need to change the constructor and the stuff in function..we will continue to take the same parameters from user so no need to make changes everyone (only need to make changes in this file)--> prevents lock-in --> future proof code