using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using To_do_IDO.Models;

namespace To_do_IDO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TaskContext _dbContext;

        public TaskController(TaskContext dbContext)
        {
            _dbContext = dbContext;    
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasks()
        {
            if(_dbContext.task == null)
            {
                return NotFound();
            }
            return await _dbContext.task.ToListAsync();
        }

        [HttpPost]

        public async Task<ActionResult<TaskModel>> PostTask(TaskModel ta)
        {
            _dbContext.task.Add(ta);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTasks), new { id = ta.Id }, ta);
        }

        [HttpPut]

        public async Task<IActionResult> PutTask(int id, TaskModel ta)
        {
            if(id != ta.Id)
            {
                return BadRequest();
            }
            _dbContext.Entry(ta).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!TaskAvailbale(id))
                {
                    return NotFound(id);
                }
                else
                {
                    throw;
                }
            }
            return Ok();
 
        }
        private bool TaskAvailbale(int id)
        {
            return (_dbContext.task?.Any(x => x.Id == id)).GetValueOrDefault();
        }
    }
}
