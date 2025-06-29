import { useNavigate } from 'react-router-dom';
import { Post } from '../types/post';
import { useEffect, useState } from 'react';
import { apiClient } from '../../lib/apiClient';
import { Author } from '../types/author';
import { Heart } from 'lucide-react';

interface CardPostProps {
	post: Post;
}

const CardPost = ({ post }: CardPostProps) => {
	const creationDate = new Date(post.createdAt);
	const navigate = useNavigate();
	const [author, setAuthor] = useState<Author | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const response = await apiClient.get('/user/basic/' + post.userId);
				setAuthor(response.data);
			} catch (err) {
				console.error(err);
			}
		})();
	}, [post.userId]);

	return (
		<div
			className="w-11/12 max-w-[600px] bg-white hover:shadow-xl transition-shadow duration-300 flex items-center gap-4 p-5 rounded-3xl border border-gray-200 cursor-pointer"
			onClick={() => navigate('/post/' + post.slug)}
		>
			<div className="flex flex-col gap-3 flex-1 min-w-0">
				<div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
					<img className="w-8 h-8 rounded-full object-cover" src={author?.profileImgUrl} alt="profilePic" />
					<span className="font-medium break-words">{author?.name}</span>
					<span className="text-gray-400">•</span>
					<span>
						{creationDate.getDate().toString().padStart(2, '0')}/
						{(creationDate.getMonth() + 1).toString().padStart(2, '0')}
					</span>
					<div className="flex items-center gap-1 text-sm text-gray-500">
						<Heart className="w-4 h-4" />
						{post.likes ?? 0}
					</div>
				</div>
				<div className="flex flex-col gap-1 min-w-0">
					<p className="text-lg font-semibold text-gray-900 break-words">{post.title}</p>
					<p className="text-sm text-gray-600 break-words line-clamp-3">{post.description}</p>
				</div>

				


			</div>

			{post.previewImgUrl && (
				<img className="w-28 min-w-28 h-28 rounded-xl object-cover" src={post.previewImgUrl} alt="post preview" />
			)}
		</div>
	);
};

export default CardPost;
