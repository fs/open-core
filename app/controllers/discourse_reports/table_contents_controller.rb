module DiscourseReports
  class TableContentsController < ::ApplicationController
    before_action :find_topic
    before_action :authorize_topic, only: :update

    def show
      if @topic
        redirect_to @topic.relative_url
      else
        raise Discourse::NotFound
      end
    end

    def update
      toc = @topic.posts.first
      toc.raw = GenerateTableContent.new(parts).build_a_raw

      save_toc(toc_sections << toc)

      render nothing: true
    end

    private

    def toc_sections
      sections.each_with_index.map do |topic, index|
        post = topic.posts.first
        previous_topic = sections.fetch(index - 1, nil) unless index.zero?
        next_topic = sections.fetch(index + 1, nil)
        GenerateNavigationLinks.new(post, previous_topic, next_topic).add_navigation
      end
    end

    def save_toc(posts)
      Post.transaction { posts.each(&:save) }
    end

    def parts
      Part.order('position').includes(chapters: :topics)
    end

    def sections
      Topic.joins(chapter: :part).includes(chapter: :part).order('discourse_reports_parts.position', 'discourse_reports_chapters.position', 'topics.position')
    end

    def find_topic
      @topic = Topic.where(archetype: 'toc').first
    end

    def authorize_topic
      guardian.ensure_can_moderate!(@topic)
    end
  end
end
