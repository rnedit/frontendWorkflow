export interface NewProfile {
   
    name: string | undefined;
    parentId: string | undefined;
    user: any | undefined;
   // userId: string | undefined;
    oldUserId: string|undefined;
    access: Array<Object> | undefined;
}