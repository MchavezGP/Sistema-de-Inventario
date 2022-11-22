import { renderHook, waitFor } from '@testing-library/react';
import { useProductos } from '../../src/hooks/useProducto';
describe('Prueba en el hook useEquipo', () => {
  test('debe regresar mas de un elemento', async () => {
    const { result } = renderHook(() => useProductos());
    await waitFor(() =>
      expect(result.current.productos.length).toBeGreaterThan(0)
    );
    const { productos } = result.current;
    console.log(productos)
    expect(productos.length).toBeGreaterThan(0);
  });
});
