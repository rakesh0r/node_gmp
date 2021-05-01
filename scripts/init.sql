CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
INSERT INTO "Users" (id, login, password, age, isdeleted) VALUES ('30a7863b-7e0a-47b7-8559-6a20cd431aca', 'rakesh', 'rakesh', 20, false) ON CONFLICT ON CONSTRAINT "Users_pkey" DO NOTHING;
INSERT INTO "Users" (id, login, password, age, isdeleted) VALUES ('30a7863b-7e0a-47b7-8559-6a20cd431acb', 'jhon', 'rakesh', 20, false) ON CONFLICT ON CONSTRAINT "Users_pkey" DO NOTHING;
INSERT INTO "Users" (id, login, password, age, isdeleted) VALUES ('30a7863b-7e0a-47b7-8559-6a20cd431acc', 'Akshy', 'rakesh', 20, false) ON CONFLICT ON CONSTRAINT "Users_pkey" DO NOTHING;
INSERT INTO "Users" (id, login, password, age, isdeleted) VALUES ('30a7863b-7e0a-47b7-8559-6a20cd431acd', 'mike', 'rakesh', 20, false) ON CONFLICT ON CONSTRAINT "Users_pkey" DO NOTHING;
INSERT INTO "Users" (id, login, password, age, isdeleted) VALUES ('30a7863b-7e0a-47b7-8559-6a20cd431ace', 'peter', 'rakesh', 20, false) ON CONFLICT ON CONSTRAINT "Users_pkey" DO NOTHING;
INSERT INTO "Users" (id, login, password, age, isdeleted) VALUES ('30a7863b-7e0a-47b7-8559-6a20cd431acf', 'alex', 'rakesh', 20, false) ON CONFLICT ON CONSTRAINT "Users_pkey" DO NOTHING;
INSERT INTO "Users" (id, login, password, age, isdeleted) VALUES ('30a7863b-7e0a-47b7-8559-6a20cd432acf', 'jenny', 'rakesh', 20, false) ON CONFLICT ON CONSTRAINT "Users_pkey" DO NOTHING;
INSERT INTO "Users" (id, login, password, age, isdeleted) VALUES ('30a7863b-7e0a-47b7-8559-6a20cd433acf', 'julie', 'rakesh', 20, false) ON CONFLICT ON CONSTRAINT "Users_pkey" DO NOTHING;