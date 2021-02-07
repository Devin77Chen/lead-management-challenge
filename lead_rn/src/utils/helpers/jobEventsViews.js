/**
 * build a lead array from a jobEvent list to be rendered on screen
 * @param  {array} suburbs Suburbs collection data
 * @param  {array} categories Categories collection data
 * @param  {array} jobEvents JobEventsInvited or JobEventsAccepted collection data 
 */
export const buildLeads = (suburbs, categories, jobEvents) => {
    if (!Array.isArray(suburbs) || !Array.isArray(categories) || !Array.isArray(jobEvents)) return [];
    return jobEvents.reduce((leads, jobEvent) => {
        const { jid, timestamp, jobDetails } = jobEvent || {};
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
        const contact_name_first = typeof contact_name === 'string' && contact_name.split(' ')[0];
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