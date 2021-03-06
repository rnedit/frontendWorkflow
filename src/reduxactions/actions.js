export const updateCurrentUser = (data) => ({
    user:data,
    type: 'CURRENT_USER'
});

export const updateValueUser = (data) => ({
    user:data,
    type: 'CURRENT_USER_UPDATE'
});

export const setUsers = (data) => ({
    usersData:data,
    type: 'SET_USERS'
});

export const setProfiles = (data) => ({
    profilesData:data,
    type: 'SET_PROFILES'
});


export const setAccessProfile = (data) => ({
    data:data,
    type: 'SET_ACCESS'
});

export const setUserToProfile = (data) => ({
    username:data,
    type: 'SET_USERTOPROFILE'
});

export const setInternalData = (data) => ({
    data: data,
    type: 'SET_INTERNAL'
});

export const setCreateInternalData = (data) => ({
    data: data,
    type: 'SET_CREATEINTERNAL'
});

export const setUpdateInternalData = (data) => ({
    data: data,
    type: 'UPDATE_INTERNAL'
});

export const setUpdateRecipientData = (data) => ({
    data: data,
    type: 'UPDATE_RECIPIENT_INTERNAL'
});

export const setUpdateRecipientCreateInternalData = (data) => ({
    data: data,
    type: 'UPDATE_RECIPIENT_CREATEINTERNAL'
});

export const setUpdateAttachmentNames = (data) => ({
    data: data,
    type: 'UPDATE_ATTACHMENTS_NAMES'
});

export const setUpdateAttachmentIds = (data) => ({
    data: data,
    type: 'UPDATE_ATTACHMENTS_IDS'
});