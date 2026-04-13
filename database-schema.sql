-- Database Schema extracted from Supabase
-- Generated: 2026-04-13T04:40:56.967Z

-- Table: perfiles
-- Accessible: Yes


-- Table: perfiles
CREATE TABLE perfiles (
  id INTEGER,
  id_usuario TEXT,
  correo TEXT,
  created_at TIMESTAMP,
  rol_usuario TEXT,
  id_empleado INTEGER
);

-- Sample data from perfiles:
-- {"id":2,"id_usuario":"8b345626-cf62-4753-82a2-36fa1d5878dd","correo":"segar12345@gmail.com","created_at":"2026-03-19T03:25:32.984898+00:00","rol_usuario":"tecnico","id_empleado":1}
-- {"id":3,"id_usuario":"deba22ee-1f27-49d8-8756-ff55c6064d17","correo":"apateti@gmail.com","created_at":"2026-03-20T08:30:39.920284+00:00","rol_usuario":"tecnico","id_empleado":1}
-- {"id":7,"id_usuario":"ea0babb9-651f-4829-b862-63ce81f39542","correo":"santiago.alonso.rivera@gmail.com","created_at":"2026-03-23T00:31:38.063173+00:00","rol_usuario":"tecnico","id_empleado":null}