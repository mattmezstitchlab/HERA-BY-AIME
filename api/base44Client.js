export const base44 = {
  entities: {
    Wedding: { list: async()=>[], filter: async()=>[] },
    PlaylistItem: { filter: async()=>[], bulkUpdate: async()=>{}, bulkCreate: async()=>[], update: async()=>{}, delete: async()=>{} },
    Song: { filter: async()=>[], bulkCreate: async()=>[], delete: async()=>{} },
    Person: { list: async()=>[] },
    MusicMoment: { filter: async()=>[] },
    WeddingParticipation: { filter: async()=>[] },
  },
  functions: { invoke: async()=>({data:{}}) },
  integrations: { Core: { UploadFile: async()=>({file_url:""}) } }
};
