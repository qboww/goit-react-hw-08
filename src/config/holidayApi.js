import axios from "axios";

const fetchHoliday = async (setHoliday, setLoading, setError) => {
  try {
    const apiKey = "FHarK6IrYQqtJANIWhc6YrSXYsWyk8fN";
    const country = "UA";
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();

    const response = await axios.get(
      `https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=${country}&year=${year}&month=${month}&day=${day}`,
    );

    const holidays = response.data.response.holidays;
    setHoliday(holidays.length > 0 ? holidays[0] : null);
  } catch (err) {
    setError("Failed to fetch holiday data");
  } finally {
    setLoading(false);
  }
};

export default fetchHoliday;
