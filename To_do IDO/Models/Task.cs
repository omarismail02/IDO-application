namespace To_do_IDO.Models
{
    public class TaskModel
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public DateTime DueDate { get; set; }
        public int EstimateNumber { get; set; }
        public string EstimateUnit { get; set; }
        public string Importance { get; set; } // Values: "LOW", "MEDIUM", "HIGH"
        public string Status { get; set; } // Values: "To Do", "Doing", "Done"
    }
}
