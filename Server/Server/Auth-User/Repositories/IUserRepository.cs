namespace Server.Auth.User.Repositories
{
    public interface IUserRepository
    {
        Task<bool> CreateAsync(UserEntity user);
        Task<UserEntity> FindByUsernameAsync(string username);
    }
}
