DECLARE	@return_value int

EXEC	@return_value = [dbo].[SP_LayThongTinNhanVien]
		@loginame = N'cn1'

SELECT	'Return Value' = @return_value

GO
