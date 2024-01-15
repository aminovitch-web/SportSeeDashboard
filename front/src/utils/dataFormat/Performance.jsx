
const Performance = (rawData) => {
    return {
      userId: rawData.userId,
      performances: rawData.data.map(item => ({
        type: rawData.kind[item.kind],
        value: item.value,
      })),
    };
  };
  
  export default Performance;
  