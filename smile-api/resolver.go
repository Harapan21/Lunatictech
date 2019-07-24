package smile_api

import (
	"context"

	"github.com/harapan21/smile-api/models"
) // THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.

type Resolver struct{}

func (r *Resolver) Mutation() MutationResolver {
	db := models.Connect()
	defer db.Close()
	return &mutationResolver{r}
}
func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) UserRegistration(ctx context.Context, input UserField) (*Auth, error) {
	panic("not implemented")
}
func (r *mutationResolver) LoginUser(ctx context.Context, input LoginUser) (*Auth, error) {
	panic("not implemented")
}
func (r *mutationResolver) Comment(ctx context.Context, input CommentField) (bool, error) {
	panic("not implemented")
}
func (r *mutationResolver) Post(ctx context.Context, input PostField) (*Post, error) {
	panic("not implemented")
}
func (r *mutationResolver) EditUser(ctx context.Context, input UserField) (*User, error) {
	panic("not implemented")
}
func (r *mutationResolver) EditPost(ctx context.Context, input PostField) (*Post, error) {
	panic("not implemented")
}
func (r *mutationResolver) EditComment(ctx context.Context, input EditCommentField) (*bool, error) {
	panic("not implemented")
}
func (r *mutationResolver) RemoveByID(ctx context.Context, input *RemoveByIDField) (*bool, error) {
	panic("not implemented")
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Post(ctx context.Context) ([]*Post, error) {
	panic("not implemented")
}
func (r *queryResolver) Trending(ctx context.Context) ([]*Post, error) {
	panic("not implemented")
}
func (r *queryResolver) Author(ctx context.Context) ([]*User, error) {
	panic("not implemented")
}
