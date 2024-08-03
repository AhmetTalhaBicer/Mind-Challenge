using System.ComponentModel.DataAnnotations;

namespace Server.Auth.DTO
{
    public class UserDTO 
    {
        public int UserId { get; set; }
        public required string Username { get; set; }

        public required string Password { get; set; }

        [Required]
        public required string ProfilePicture { get; set; }
        public string? Biography { get; set; }
    }

    public class UserLoginDTO
    {
        [Required]
        public required string Username { get; set; }
        [Required]
        public required string Password { get; set; }
    }



    public class UserSignUpDTO
    {
        [Required]
        public required string Username { get; set; }
        [Required]
        public required string Password { get; set; }

        public required string ProfilePicture { get; set; }

        public string? Biography { get; set; }
    }

    public class UserUpdateDTO
    {
        [Required]
        public required string Username { get; set; }
        [Required]
        public required string Password { get; set; }

        [Required]
        public required string ProfilePicture { get; set; }
        public string? Biography { get; set; }
    }

    public class UserResponseDTO
    {
        public int UserId { get; set; }
        public required string Username { get; set; }

        public required string ProfilePicture { get; set; }

        public string? Biography { get; set; }
    }

    public class UserTokenDTO
    {
        public required string Token { get; set; }
    }


    public class UserChangePasswordDTO
    {
        [Required]
        public required string Username { get; set; }
        [Required]
        public required string CurrentPassword { get; set; }
        [Required]
        public required string NewPassword { get; set; }

    }
}
