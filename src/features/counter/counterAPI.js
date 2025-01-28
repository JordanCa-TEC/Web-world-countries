// Función mock para simular la solicitud asincrónica de un contador
export function fetchCount(countIncrement = 1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulación de error aleatorio (opcional)
      const randomError = Math.random() < 0.1; // 10% de probabilidad de error
      if (randomError) {
        reject(new Error('Algo salió mal al obtener el contador'));
      } else {
        resolve({ data: countIncrement });
      }
    }, 500);
  });
}
