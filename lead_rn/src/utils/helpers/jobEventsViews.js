export const buildLeads = (suburbs, categories, invitedJobEvents) => {
    if (!Array.isArray(suburbs) || !Array.isArray(categories) || !Array.isArray(invitedJobEvents)) return [];
    return invitedJobEvents.reduce((leads, jobEvent) => {
        const { jid, timestamp, jobDetails } = jobEvent;
        const { 
            status, 
            suburb_id, 
            category_id, 
            contact_name, 
            contact_phone, 
            contact_email, 
            price, 
            description 
        } = jobDetails || {};
        const suburb = suburbs.find(({ _id }) => _id === suburb_id);
        const category = categories.find(({ _id }) => _id === category_id);
        // Assumption: contact_name contains a person's first name and second name, they are separated by a space
        const contact_name_first = contact_name.split(' ')[0];
        const lead = {
            contact_name,
            contact_name_first,
            created_at: timestamp,
            suburb,
            category,
            jid,
            description,
            price,
            contact_phone,
            contact_email
        }
        return leads.concat(lead);
    }, []);
}