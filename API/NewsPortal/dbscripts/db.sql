CREATE DATABASE [NewsPortal]
GO


USE NewsPortal;

CREATE TABLE dbo.Category (
	Id INT NOT NULL IDENTITY(1, 1) 
	,Name NVARCHAR(50) NOT NULL
	,CreatedDateTime DATETIME NOT NULL
	,CONSTRAINT PK_Category PRIMARY KEY NONCLUSTERED (Id)
	);



CREATE TABLE dbo.Article
   (
	Id INT NOT NULL IDENTITY(1, 1) 
	,Title NVARCHAR(50) NOT NULL
	,Description NVARCHAR(500) NOT NULL
	,CategoryId INT NOT NULL
	,CreatedDateTime DATETIME NOT NULL
	,CONSTRAINT PK_Article PRIMARY KEY NONCLUSTERED (Id)
	,CONSTRAINT FK_Article_Category FOREIGN KEY (CategoryId)
	REFERENCES Category (Id)
	ON DELETE CASCADE
   );



INSERT INTO [NewsPortal].[dbo].[Category] (Name, CreatedDateTime) VALUES ('Business', GETDATE());
INSERT INTO [NewsPortal].[dbo].[Category] (Name, CreatedDateTime) VALUES ('Travel', GETDATE());
INSERT INTO [NewsPortal].[dbo].[Category] (Name, CreatedDateTime) VALUES ('Movie', GETDATE());
INSERT INTO [NewsPortal].[dbo].[Category] (Name, CreatedDateTime) VALUES ('Lifestyle', GETDATE());
INSERT INTO [NewsPortal].[dbo].[Category] (Name, CreatedDateTime) VALUES ('Health & Fitness', GETDATE());


DECLARE @index INT = 0;
DECLARE @count INT = 0;
DECLARE @min INT = 0;
DECLARE @max INT = 0;

WHILE @index < 100
BEGIN
SET @count = @index + 1;
SET @min = (SELECT TOP 1 Id FROM [NewsPortal].[dbo].[Category] ORDER BY Id ASC);
SET @max = (SELECT TOP 1 Id FROM [NewsPortal].[dbo].[Category] ORDER BY Id DESC);
   
INSERT INTO [NewsPortal].[dbo].[Article] (Title,Description,CategoryId,CreatedDateTime) VALUES
	('Article Title ' + CONVERT(VARCHAR,@count), 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
	CAST(ROUND((@max-@min) * RAND() + @min, 0) AS INT), DATEADD(mi,@count,GETDATE()));

SET @index = @count;
END;

PRINT 'Added automatically generated 5 Categories and ' + CONVERT(VARCHAR,@count) + ' Articles';
GO