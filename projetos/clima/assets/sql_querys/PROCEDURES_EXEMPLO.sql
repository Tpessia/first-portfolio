-- IN parameter:

-- DROP PROCEDURE IF EXISTS Select_Summary;
-- 
-- DELIMITER $$
-- 
-- CREATE PROCEDURE Select_Summary(IN quantidade INT)
-- BEGIN
-- 	SELECT * FROM sao_paulo_summary
-- 	LIMIT quantidade;
-- END $$
-- 
-- DELIMITER ;
-- 
-- CALL Select_Summary(1);



-- OUT parameter:

-- DROP PROCEDURE IF EXISTS Count_Summary;

-- DELIMITER $$
-- 
-- CREATE PROCEDURE Count_Summary(OUT quantidade INT)
-- BEGIN
-- SELECT COUNT(*) INTO quantidade FROM sao_paulo_summary;	
-- END $$
-- 
-- DELIMITER ;

-- CALL Count_Summary(@total);
-- SELECT @total;



-- INOUT parameter:

-- DROP PROCEDURE IF EXISTS Elevar_Ao_Quadrado;

-- DELIMITER $$

-- CREATE PROCEDURE Elevar_Ao_Quadrado(INOUT numero INT)
-- BEGIN
-- 	SET numero = numero * numero;
-- END $$
-- DELIMITER ;

-- SET @valor = 5;
-- CALL Elevar_Ao_Quadrado(@valor);
-- SELECT @valor;



-- DECLARAÇÃO DE VARIÁVEIS NA PROCEDURE

-- DECLARE nome_variável TIPO DEFAULT valor_padrao; 
-- Default (opcional): define um valor padrão ao inicializar

-- DROP PROCEDURE IF EXISTS Subtrair_Um;

-- DELIMITER $$
-- 
-- CREATE PROCEDURE Subtrair_Um(INOUT numero INT)
-- BEGIN
-- 	DECLARE um INT DEFAULT 1;
--     
--     -- Teste de Escopo (nada ocorre, pois variável só é alterada enquanto no escopo)
--     BEGIN
-- 		DECLARE um INT DEFAULT 2;
--     END;

-- 	SET numero = numero - 1;
-- END $$

-- DELIMITER ;

-- SET @valor = 5;
-- CALL Subtrair_Um(@valor);
-- SELECT @valor;