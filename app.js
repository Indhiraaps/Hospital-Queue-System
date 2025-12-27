// Initialize Supabase
const SUPABASE_URL = "https://lvjhpmbmozoalwqwocbe.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2amhwbWJtb3pvYWx3cXdvY2JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4NDE2NjIsImV4cCI6MjA4MjQxNzY2Mn0.FFHQhjZKeCw1Q4RoiTeqGMaei-iPsJf9mu1Bbj2M7bc";
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// UPDATE YOUR FUNCTIONS TO USE 'db'
async function getQueue() {
    const { data, error } = await db // Changed from supabase to db
        .from('appointments')
        .select('*')
        .neq('status', 'completed')
        .order('priority', { ascending: false }) 
        .order('token_number', { ascending: true });
    
    if (error) {
        console.error("Error fetching queue:", error);
        return [];
    }

    return data.sort((a, b) => {
        if (a.priority === 'emergency' && b.priority !== 'emergency') return -1;
        if (a.priority !== 'emergency' && b.priority === 'emergency') return 1;
        return a.token_number - b.token_number;
    });
}