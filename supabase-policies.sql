-- Políticas de Row Level Security (RLS) para tablas del sistema
-- Ejecutar en Supabase SQL Editor

-- Habilitar RLS en todas las tablas
ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE sucursales ENABLE ROW LEVEL SECURITY;
ALTER TABLE distribuidoras ENABLE ROW LEVEL SECURITY;
ALTER TABLE centros_servicio ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfiles ENABLE ROW LEVEL SECURITY;

-- Política para usuarios autenticados (lectura)
CREATE POLICY "Allow authenticated read all" ON empresas
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read all" ON sucursales
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read all" ON distribuidoras
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read all" ON centros_servicio
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read all" ON clientes
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read own" ON perfiles
  FOR SELECT TO authenticated USING (auth.uid()::text = id_usuario);

-- Políticas para usuarios con rol 'admin' (todas las operaciones)
CREATE POLICY "Allow admin all operations" ON empresas
  FOR ALL TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM perfiles 
      WHERE perfiles.id_usuario = auth.uid()::text 
      AND perfiles.rol_usuario = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM perfiles 
      WHERE perfiles.id_usuario = auth.uid()::text 
      AND perfiles.rol_usuario = 'admin'
    )
  );

CREATE POLICY "Allow admin all operations" ON sucursales
  FOR ALL TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM perfiles 
      WHERE perfiles.id_usuario = auth.uid()::text 
      AND perfiles.rol_usuario = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM perfiles 
      WHERE perfiles.id_usuario = auth.uid()::text 
      AND perfiles.rol_usuario = 'admin'
    )
  );

CREATE POLICY "Allow admin all operations" ON distribuidoras
  FOR ALL TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM perfiles 
      WHERE perfiles.id_usuario = auth.uid()::text 
      AND perfiles.rol_usuario = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM perfiles 
      WHERE perfiles.id_usuario = auth.uid()::text 
      AND perfiles.rol_usuario = 'admin'
    )
  );

CREATE POLICY "Allow admin all operations" ON centros_servicio
  FOR ALL TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM perfiles 
      WHERE perfiles.id_usuario = auth.uid()::text 
      AND perfiles.rol_usuario = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM perfiles 
      WHERE perfiles.id_usuario = auth.uid()::text 
      AND perfiles.rol_usuario = 'admin'
    )
  );

CREATE POLICY "Allow admin all operations" ON clientes
  FOR ALL TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM perfiles 
      WHERE perfiles.id_usuario = auth.uid()::text 
      AND perfiles.rol_usuario = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM perfiles 
      WHERE perfiles.id_usuario = auth.uid()::text 
      AND perfiles.rol_usuario = 'admin'
    )
  );

-- Nota: Perfiles tiene RLS pero requiere manejo especial
-- Los usuarios solo pueden ver/editar su propio perfil
CREATE POLICY "Allow admin all operations" ON perfiles
  FOR ALL TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM perfiles p
      WHERE p.id_usuario = auth.uid()::text 
      AND p.rol_usuario = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM perfiles p
      WHERE p.id_usuario = auth.uid()::text 
      AND p.rol_usuario = 'admin'
    )
  );

-- Permitir a usuarios ver/editar su propio perfil
CREATE POLICY "Allow users manage own profile" ON perfiles
  FOR ALL TO authenticated 
  USING (auth.uid()::text = id_usuario)
  WITH CHECK (auth.uid()::text = id_usuario);
