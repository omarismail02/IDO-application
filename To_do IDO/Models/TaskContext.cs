using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using System.Collections.Generic;


namespace To_do_IDO.Models
{
    public class TaskContext : DbContext
    {
        public TaskContext(DbContextOptions<TaskContext> options ) : base(options)
        {
             
        }

        public DbSet<TaskModel> task { get; set; }
        public DbSet<User> users { get; set; }
    }
}

