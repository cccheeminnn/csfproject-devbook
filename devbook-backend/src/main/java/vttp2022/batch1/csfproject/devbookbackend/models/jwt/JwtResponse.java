package vttp2022.batch1.csfproject.devbookbackend.models.jwt;

public class JwtResponse {

    private final String jwttoken;

	public JwtResponse(String jwttoken) {
		this.jwttoken = jwttoken;
	}

	public String getToken() {
		return this.jwttoken;
	}

}
