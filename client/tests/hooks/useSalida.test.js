import { renderHook, waitFor } from '@testing-library/react';
import { useSalida} from '../../src/hooks/useSalida';
describe('Prueba en el hook useSalida', () => {
  test('debe regresar mas de un elemento', async () => {
    const { result } = renderHook(() => useSalida());
    await waitFor(() =>
      expect(result.current.salidas.length).toBeGreaterThan(0)
    );
    const { salidas } = result.current;
    console.log(salidas)
    expect(salidas.length).toBeGreaterThan(0);
  });
});
