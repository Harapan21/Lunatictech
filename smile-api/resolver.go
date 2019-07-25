package smile_api

import (
	"context"

	"github.com/harapan21/smile-api/models"
)

// THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

type Resolver struct{}

func (r *Resolver) Mutation() MutationResolver {
	return &mutationResolver{r}
}
func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) UserRegistration(ctx context.Context, input models.UserField) (*models.Auth, error) {
	panic("not implemented")
}
func (r *mutationResolver) LoginUser(ctx context.Context, input models.LoginUser) (*models.Auth, error) {
	panic("not implemented")
}
func (r *mutationResolver) Comment(ctx context.Context, input models.CommentField) (bool, error) {
	panic("not implemented")
}
func (r *mutationResolver) Post(ctx context.Context, input models.PostField) (*models.Post, error) {
	panic("not implemented")
}
func (r *mutationResolver) EditUser(ctx context.Context, input models.UserField) (*models.User, error) {
	panic("not implemented")
}
func (r *mutationResolver) EditPost(ctx context.Context, input models.PostField) (*models.Post, error) {
	panic("not implemented")
}
func (r *mutationResolver) EditComment(ctx context.Context, input models.EditCommentField) (*bool, error) {
	panic("not implemented")
}
func (r *mutationResolver) DoingByIDMut(ctx context.Context, id string, forArg models.GenericEnum, to models.GenericOptionEnum) (models.DoingByIDUnion, error) {
	panic("not implemented")
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Post(ctx context.Context) ([]*models.Post, error) {
	panic("not implemented")
}
func (r *queryResolver) Trending(ctx context.Context) ([]*models.Post, error) {
	panic("not implemented")
}
func (r *queryResolver) Author(ctx context.Context) ([]*models.User, error) {
	panic("not implemented")
}
