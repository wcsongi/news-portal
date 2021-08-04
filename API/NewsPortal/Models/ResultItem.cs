namespace NewsPortal.Models
{
    public class ResultItem
    {
        public ResultItem()
        {
            PageIndex = 1;
            PageSize = 5;
            SearchTerm = string.Empty;
        }

        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public string SearchTerm { get; set; }
    }
}