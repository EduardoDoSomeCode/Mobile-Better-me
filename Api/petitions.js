async function fetchUser() {
    try {
      const data = await fetchWithInterceptor(`${API_URL}/user`);
      console.log('User:', data);
    } catch (error) {
      console.error('Error en fetchUser:', error);
    }
  }
  
  async function fetchNotes() {
    try {
      const data = await fetchWithInterceptor(`${API_URL}/notes`);
      console.log('Notes:', data);
    } catch (error) {
      console.error('Error en fetchNotes:', error);
    }
  }  

  async function fetchQuotes() {
    try {
      const data = await fetchWithInterceptor(`${API_URL}/quotes`);
      console.log('Quotes:', data);
    } catch (error) {
      console.error('Error en fetchQuotes:', error);
    }
  }

  async function fetchQuotes() {
    try {
      const data = await fetchWithInterceptor(`${API_URL}/quotes`);
      console.log('Quotes:', data);
    } catch (error) {
      console.error('Error en fetchQuotes:', error);
    }
  }