const apiFetch = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      return null;
    }
};

export default apiFetch;