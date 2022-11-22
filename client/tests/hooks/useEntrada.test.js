import { renderHook, waitFor } from '@testing-library/react';
import { useEntrada} from '../../src/hooks/useEntrada';
describe('Prueba en el hook useEntrada', () => {
  test('debe regresar mas de un elemento', async () => {
    const { result } = renderHook(() => useEntrada());
    await waitFor(() =>
      expect(result.current.entradas.length).toBeGreaterThan(0)
    );
    const { entradas } = result.current;
    console.log(entradas)
    expect(entradas.length).toBeGreaterThan(0);
  });
});
