import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

// docs -> References -> Database API
// docs -> References -> Storage (for bucket)

export class Service {
  client = new Client();
  databases;
  storage; //bucket

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, // slug value is passed as DocumentID, we can also use ID.unique()
        {
          title,
          content,
          featuredImage,
          status,
          userID, // we have created these attributes in database on appwrite website
          // featuredImage is id of image (we get this in in uploadFile)
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  //slug -> document ID , no need for userID as we won't be updating that
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        } // new object
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      ); // no need to return the  post
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  // get one post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  // get all active posts
  // docs -> Query
  // queries is name of parameter and it is an array of query -- Query.equal('key_name', 'value')
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries // or write array of query here --> [Query.equal("status", "active")]
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false; // in case no matching post is found
    }
  }

  // file upload service/method -- docs->Guides->Storage
  // appwrite for web -> Storage
  // pass actual file as parameter
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true; // file is deleted successfully
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false; // in case file is not deleted due to some reason
    }
  }

  // file preview is returned faster so no need of async await
  // in docs, promises are not written for it as well
  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
