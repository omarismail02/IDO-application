using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using To_do_IDO.Models;
using Microsoft.AspNetCore.Identity;


namespace To_do_IDO.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly TaskContext _context;
        

        public UsersController(TaskContext context)
        {
            _context = context;
            
            
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User user)
        {
            // Check if the email already exists
            var existingUser = await _context.users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser != null)
            {
                return Conflict("User with this email already exists");
            }

            // Add the new user to the database
            _context.users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully");
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginRequest loginRequest)
        {
            // Find the user based on email
            var user = await _context.users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);
            if (user == null)
            {
                return NotFound("User not found");
            }

            // Verify the password
            if (user.Password != loginRequest.Password)
            {
                return Unauthorized("Invalid credentials");
            }
            

            // Login successful
            return Ok("Login successful");
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            // Find the user based on email (assuming you have a similar method in your UserService or UserRepository)
            var user = await _context.users.FirstOrDefaultAsync(u => u.Email == "omar@gmail.com");
            if (user == null)
            {
                return NotFound("User not found");
            }

            // Logout successful
            return Ok("Logout successful");
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> GetUser(string email)
        {
            // Find the user based on email
            var user = await _context.users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                return NotFound("User not found");
            }

            // Return user details
            return Ok(user);
        }




    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
